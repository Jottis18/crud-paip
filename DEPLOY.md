# Deploy - Frontend (Vercel) e Backend (Render)

## 1) Deploy do backend na Render (Spring Boot)

Opcao recomendada: na Render, use **Blueprint** apontando para o arquivo `render.yaml` na raiz do repo. Assim runtime e comandos ficam fixos como Java automaticamente.

1. Acesse [Render](https://render.com/) e clique em **New +** > **Web Service**.
2. Conecte seu GitHub e selecione o repositório `Jottis18/crud-paip`.
3. Configure:
   - **Environment/Runtime**: `Java` (nao Node)
   - **Root Directory**: `desafio-produtos`
   - **Runtime**: `Java`
   - **Build Command**: `./mvnw clean package -DskipTests`
   - **Start Command**: `java -jar target/desafio-produtos-0.0.1-SNAPSHOT.jar`
4. Em **Environment Variables**, adicione:
   - `app.cors.allowed-origin` = URL do frontend na Vercel (ex.: `https://seu-front.vercel.app`)
5. Faça o deploy e copie a URL final do backend (ex.: `https://seu-backend.onrender.com`).

## 2) Ajustar URL da API do frontend

No arquivo `frontend/desafio-produtos-front/src/environments/environment.ts`, troque:

- `https://SEU-BACKEND.onrender.com/api/produtos`

pela URL real da sua API na Render, por exemplo:

- `https://seu-backend.onrender.com/api/produtos`

Depois faça commit e push dessa alteração.

## 3) Deploy do frontend na Vercel (Angular)

1. Acesse [Vercel](https://vercel.com/) e clique em **Add New...** > **Project**.
2. Importe o repositório `Jottis18/crud-paip`.
3. Configure:
   - **Framework Preset**: `Angular`
   - **Root Directory**: `frontend/desafio-produtos-front`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/desafio-produtos-front/browser`
4. Clique em **Deploy**.

## 4) Último ajuste de CORS na Render

Com a URL final do frontend gerada pela Vercel:

1. Volte na Render.
2. Atualize `app.cors.allowed-origin` com a URL da Vercel.
3. Faça **Redeploy**.

## 5) Teste final

1. Abra o frontend na Vercel.
2. Tente listar, criar, editar e excluir produtos.
3. Se houver erro de CORS, confirme se:
   - `app.cors.allowed-origin` está com a URL correta da Vercel (sem barra no final);
   - o backend foi redeployado após a alteração.
