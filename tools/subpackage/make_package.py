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
game = open(os.path.join(PKG_DIR, "assets/game.js"), 'w')
game.write("")
game.close()
