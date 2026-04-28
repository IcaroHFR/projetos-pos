# Better Auth Next.js Demo

Demo mínima em Next.js App Router usando Better Auth e SQLite com login social GitHub.

## Passos

1. O arquivo `.env` já foi criado com os campos necessários. Preencha as credenciais:

2. Configure `GITHUB_CLIENT_ID` e `GITHUB_CLIENT_SECRET` (veja seção abaixo).

3. Para produção, altere `BETTER_AUTH_SECRET` para uma string segura de pelo menos 32 caracteres.

4. Instale dependências:

```bash
npm install
```

5. Execute a migração do Better Auth:

```bash
npm run migrate
```

6. Inicie o servidor local:

```bash
npm run dev
```

7. Abra `http://localhost:3000`

## Configuração do GitHub OAuth

Para testar o login com GitHub:

1. Acesse [GitHub Developer Settings](https://github.com/settings/developers)
2. Clique em "New OAuth App"
3. Preencha:
   - **Application name**: "Better Auth Demo"
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Copie o `Client ID` e `Client Secret` para o arquivo `.env`

## Observações

- O banco local será gerado em `better-auth.sqlite`.
- Configure o GitHub OAuth App com o redirect URI:
  `http://localhost:3000/api/auth/callback/github`
- Sem credenciais do GitHub, o botão mostrará uma mensagem de erro.
- Para produção, use um `BETTER_AUTH_SECRET` de pelo menos 32 caracteres.
