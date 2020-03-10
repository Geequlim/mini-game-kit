import os, sys, shutil, json
import re
import fnmatch
import os
import sys

cache = []

SRC_DIR = ''
PKG_DIR = os.path.join('release', sys.argv[len(sys.argv) -1 ])

def glob_path(path, pattern):
	result = []
	for root, _, files in os.walk(path):
		for filename in files:
			if fnmatch.fnmatch(filename, pattern):
				result.append(os.path.join(root, filename))
	return result

def should_copu_file(path):
	if path.endswith(".json"): return False
	if path.endswith(".lm"): return True
	if path.endswith(".lh"): return True
	if path.endswith(".ls"): return True
	if path.endswith(".lav"): return True
	size = os.path.getsize(f) / 1024
	if size <= 15:
		return True
	return False

def list_files():
	files = []
	for f in glob_path(PKG_DIR, "**"):
		if should_copu_file(f):
			files.append(f)
	print(json.dumps(files, indent='\t').replace("\\\\", "/"))

if __name__ == "__main__":
	files = glob_path('assets', "**")
	for f in files:
		if should_copu_file(f):
			target = os.path.join(PKG_DIR, f)
			dir = os.path.dirname(target)
			if not os.path.isdir(dir):
				os.makedirs(dir, True)
			shutil.copyfile(f, target)
	list_files()


