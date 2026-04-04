import os

IGNORE_DIRS = {"node_modules", ".next", ".git", "dist", "build"}

def print_tree(root, prefix=""):
    try:
        entries = sorted(os.listdir(root))
    except PermissionError:
        return

    entries = [e for e in entries if e not in IGNORE_DIRS]

    for index, entry in enumerate(entries):
        path = os.path.join(root, entry)
        is_last = index == len(entries) - 1

        connector = "└── " if is_last else "├── "
        print(prefix + connector + entry)

        if os.path.isdir(path):
            extension = "    " if is_last else "│   "
            print_tree(path, prefix + extension)

if __name__ == "__main__":
    print_tree(".")