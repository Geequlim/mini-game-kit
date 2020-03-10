import os, sys, shutil, json
cache = []

SRC_DIR = ''
PKG_DIR = os.path.join('release', sys.argv[len(sys.argv) -1 ])

files = json.loads(
	open("tools/subpackage/package_files.json", 'r', encoding='utf8').read(),
	encoding='utf8'
)
for file in files:
	if not file in cache:
		cache.append(file)
	src_path = os.path.join(SRC_DIR, file)
	tar_path = os.path.join(PKG_DIR, file)
	if not os.path.isdir(os.path.dirname(tar_path)):
		try:
			os.makedirs(os.path.dirname(tar_path))
		except:
			pass
	try:
		shutil.copy(src_path, tar_path)
		print(src_path, "=>", tar_path)
	except:
		pass

pkgs = []
for dir in json.load(open('tools/subpackage/packages.json', 'r')):
	game = open(os.path.join(PKG_DIR, dir, "game.js"), 'w')
	game.write("")
	game.close()
	pkgs.append(dir)

import fnmatch
def glob_path(path, pattern):
	result = []
	for root, _, files in os.walk(path):
		for filename in files:
			if fnmatch.fnmatch(filename, pattern):
				result.append(os.path.join(root, filename))
	return result

for f in (glob_path(os.path.join(PKG_DIR, "assets"), "**")):
	parts = f.split('.')
	ext = parts[len(parts) - 1]
	if ext in ['lh', 'ls', 'lmat']:
		d = json.load(open(f, 'r'))
		json.dump(d, open(f, 'w'))

try:
	game = json.load(open(os.path.join(PKG_DIR, "game.json"), 'r'))
	subpackages = []
	for dir in pkgs:
		subpackages.append({
			'name': os.path.basename(dir),
			'root': dir + '/'
		})
	game['subpackages'] = subpackages
	json.dump(game, open(os.path.join(PKG_DIR, "game.json"), 'w'), sort_keys=True, indent='\t', ensure_ascii=False)
except:
	pass
