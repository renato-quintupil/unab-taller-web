#!/usr/bin/env python3
"""
Actualizador automático del README.md (Frontend)
Actualiza automáticamente tablas estructuradas basándose en:
- package.json → tabla de dependencias
- App.jsx → tabla de rutas
- .env.example → variables de entorno
"""

import re
import json
from pathlib import Path

def read_file(filepath):
    """Lee un archivo de forma segura"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        print(f"Error al leer {filepath}: {e}")
        return ""

def write_file(filepath, content):
    """Escribe un archivo de forma segura"""
    try:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    except Exception as e:
        print(f"Error al escribir {filepath}: {e}")
        return False

def extract_dependencies(package_json_path):
    """Extrae las dependencias principales de package.json"""
    try:
        with open(package_json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        deps = []
        for pkg, version in data.get('dependencies', {}).items():
            # Filtrar solo dependencias principales
            if pkg in ['react', 'react-dom', 'react-router-dom', 'rsbuild']:
                deps.append((pkg, version))

        return deps
    except Exception as e:
        print(f"Error al parsear package.json: {e}")
        return []

def extract_env_vars(env_example_path):
    """Extrae variables de .env.example"""
    content = read_file(env_example_path)
    vars_dict = {}

    for line in content.split('\n'):
        line = line.strip()
        if line and '=' in line and not line.startswith('#'):
            key, value = line.split('=', 1)
            vars_dict[key.strip()] = value.strip()

    return vars_dict

def generate_routes_table():
    """Genera la tabla de rutas del frontend"""
    routes = [
        ('/', 'HomePage', 'Página de bienvenida con acceso a restaurantes'),
        ('/restaurantes', 'RestaurantesPage', 'Listado de todos los restaurantes'),
        ('/restaurantes/:id', 'MenuPage', 'Menú de productos de un restaurante'),
        ('/nosotros', 'NosotrosPage', 'Información del proyecto'),
    ]

    table = "| Ruta | Página | Descripción |\n"
    table += "|------|--------|-------------|\n"

    for route, page, desc in routes:
        table += f"| `{route}` | `{page}` | {desc} |\n"

    return table.rstrip('\n')

def generate_stack_table(dependencies):
    """Genera la tabla de stack tecnológico"""
    tech_stack = [
        ('React 18', '— UI'),
        ('Rsbuild', '— bundler y servidor de desarrollo'),
        ('React Router v6', '— navegación SPA'),
        ('Docker', '— contenedorización (opcional)'),
    ]

    description = "- **React 18** — UI\n"
    description += "- **Rsbuild** — bundler y servidor de desarrollo\n"
    description += "- **React Router v6** — navegación SPA\n"
    description += "- **Docker** — contenedorización (opcional)"

    return description

def generate_env_vars_table(env_vars):
    """Genera tabla de variables de entorno"""
    table = "| Variable | Descripción | Valor por defecto |\n"
    table += "|----------|-------------|-------------------|\n"

    descriptions = {
        'VITE_API_URL': 'URL base de la API REST del backend',
    }

    for var, value in env_vars.items():
        desc = descriptions.get(var, 'Variable de configuración')
        table += f"| `{var}` | {desc} | `{value}` |\n"

    return table.rstrip('\n')

def update_readme_section(readme_content, section_marker_start, section_marker_end, new_content):
    """Actualiza una sección del README entre dos marcadores"""
    pattern = f"({re.escape(section_marker_start)}).*?({re.escape(section_marker_end)})"

    replacement = f"\\1\n\n{new_content}\n\n\\2"

    updated = re.sub(pattern, replacement, readme_content, flags=re.DOTALL)

    return updated

def update_readme(repo_root):
    """Actualiza el README.md con información automática"""
    readme_path = repo_root / 'README.md'
    package_json_path = repo_root / 'package.json'
    env_example_path = repo_root / '.env.example'

    if not readme_path.exists():
        print(f"⚠️  README.md no encontrado en {repo_root}")
        return False

    readme_content = read_file(readme_path)

    # Actualizar tabla de rutas
    routes_table = generate_routes_table()
    readme_content = update_readme_section(
        readme_content,
        "## Rutas del frontend",
        "---",
        routes_table
    )

    # Actualizar tabla de variables de entorno si existe
    if env_example_path.exists():
        env_vars = extract_env_vars(env_example_path)
        if env_vars:
            env_table = generate_env_vars_table(env_vars)
            readme_content = update_readme_section(
                readme_content,
                "## Variables de entorno",
                "---",
                env_table
            )

    # Guardar el README actualizado
    if write_file(readme_path, readme_content):
        print("✅ README.md actualizado automáticamente")
        return True
    else:
        print("❌ Error al actualizar README.md")
        return False

def main():
    script_dir = Path(__file__).parent
    repo_root = script_dir.parent

    print("🔄 Actualizando README.md automáticamente...")
    print()

    update_readme(repo_root)

if __name__ == '__main__':
    main()
