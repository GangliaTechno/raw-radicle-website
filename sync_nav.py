import sys

header_start_index = 525
header_end_index = 943

login_start_line = 245
login_end_line = 642

register_start_line = 245
register_end_line = 642

def replace_section(target_file, start_line, end_line, source_content):
    with open(target_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Lines are 1-indexed, so start_line-1
    new_lines = lines[:start_line-1] + [source_content] + lines[end_line:]
    
    with open(target_file, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)

with open('public/index.html', 'r', encoding='utf-8') as f:
    index_lines = f.readlines()
    # Extract lines 525 to 943 (1-indexed)
    source_content = "".join(index_lines[header_start_index-1:header_end_index])

replace_section('public/login.html', login_start_line, login_end_line, source_content)
replace_section('public/register.html', register_start_line, register_end_line, source_content)

print("Replacement complete for login.html and register.html")
