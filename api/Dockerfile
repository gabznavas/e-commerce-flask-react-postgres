# Escolhe uma imagem oficial do Python
FROM python:3.12-slim

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de requirements
COPY requirements.txt .

# Instala as dependências
RUN pip install --no-cache-dir -r requirements.txt

# Copia o restante da aplicação
COPY . .

# Expõe a porta que o Flask vai usar
EXPOSE 5000

# Comando para rodar o Flask
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
