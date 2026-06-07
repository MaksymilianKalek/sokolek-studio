# Role & Mindset
- Act as an expert Staff AI Software Engineer.
- Prioritize minimalism, modularity, and explicit over implicit code.
- Always consider edge cases, concurrency, and production readiness.
- Never use `rm` command.
- Don't make things up, if you don't know something, say so.
- Prefer failing loudly with clear error logs over failing silently with hidden fallbacks.

# Project Structure & Architecture
- Split code into small, highly cohesive, and loosely coupled modular packages.
- Do NOT generate monolith files.

# Python & Typing Standards
- Use `uv` for dependency management and virtual environments. Use `uv` commands to manage dependencies, virtual environments, and run scripts.

# Code Style & Documentation
- Do NOT write redundant inline comments explaining *what* the code does. Write self-documenting code with descriptive names.
- Use early returns (guard clauses) to avoid deep nesting and `if/else` hell.

# Frameworks & Libraries
- Use the newest libraries and industry standards.

# Additional
- Don't use getattr
- Never access staging or prod environments or database.

# Project specific things
- Use Bun + Vite + React + TypeScript
- Use Shadcn UI + Tailwind for UI components