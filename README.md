## E-commerce com Flask, React e PostgreSQL

Este projeto é um E-commerce fullstack

    Backend: Flask + Flask-RESTful + SQLAlchemy + PostgreSQL
    Frontend: React + Vite + TailwindCSS + React Hook Form


Tecnologias Backend (Flask)

    Flask (3.1.0)
    Flask-RESTful (0.3.10)
    Flask-CORS (5.0.1)
    Flask-SQLAlchemy (3.1.1)
    SQLAlchemy (2.0.40)
    PyJWT (2.10.1)
    bcrypt (4.3.0)
    Faker (0.7.4) — (para gerar dados falsos nos seeds)
    python-dotenv (1.1.0) — (carregamento de variáveis de ambiente)
    Banco de dados utilizado: PostgreSQL


Frontend (React + Vite)

    React (^19.0.0)
    React-DOM (^19.0.0)
    React Router (^7.5.2) — gerenciamento de rotas
    React Hook Form (^7.56.1) — gerenciamento de formulários
    React Icons (^5.5.0) — ícones para o projeto
    TailwindCSS (^4.1.4) — estilização rápida e responsiva
    Vite (^6.3.1) — ferramenta de build e desenvolvimento
    TypeScript (~5.7.2) — (tipagem estática no frontend)


### Instalação
    # Clonar o projeto:
    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio

Banco de dados

    # Suba o banco de dados no diretório /database
    docker-compose up

Backend - Flask

    # Crie e ative seu ambiente virtual;

    python -m venv venv
    source venv/bin/activate   # Linux/Mac
    venv\Scripts\activate   
    

    # Instale as dependências;
    pip install -r requirements.txt

    # Copie o arquivo o arquivo .env.example para .env e edite as  variáveis;

    # Execute o servidor flask.
    python app.py

Frontend - React

    # Instale as dependências;
    npm install

    Rode o ambiente de desenvolvimento.
    npm run dev