# SSH

![SSH Server](/images/server.png)

Como funciona SSH e como proteger. Com exemplo de brute force attack.
Desenvolvido pelos acadêmicos:

 - Aline Gemelli
 - Bruno Cesca
 - Mateus Calza

## Acessando servidores

```bash
ssh user@host
```

## Configurando acesso seguro sem senha

É possível fazer o acesso usando chaves assimétricas.

Para este procedimento, garanta que há o `ssh-keygen` esteja disponível no seu terminal, em distribuições baseadas no Ubuntu/Debian pode ser instalado com `sudo apt install -y openssh-client`. Em versões mais recentes do Windows já está disponível no terminal.

O primeiro passo é gerar um par seguro de chaves na sua máquina pessoal, caso ainda não tenha:

```bash
ssh-keygen -o -a 100 -t ed25519 -f ~/.ssh/id_ed25519 -C "fulano@example.com"
```

Então você deve copiar sua chave pública, se você já possuia uma chave do tipo RSA use o comando `cat ~/.ssh/id_rsa.pub`, se você gerou no passo anterior, apresente sua chave com:

```bash
cat ~/.ssh/id_rsa.pub
```

## Teste de Brute Force Attack

```bash
npm install -g mateuscalza/ssh-security
ssh-brute-force user@host
```

## Como prevenir ataques

 - Configurar acesso segurou sem senha
 - Usar uma senha forte, gerada automaticamente
 - Bloquear acessos massivos com [Fail2ban](https://www.linode.com/docs/security/basics/using-fail2ban-to-secure-your-server-a-tutorial/)
 - Mudar a porta padrão
 - Permitir apenas IPs específicos no arquivo: `nano /etc/ssh/sshd_config`
 - Manter apenas usuários SSH necessários: `cat /etc/shadow | grep '^[^:]*:[^\*!]'`

## Observações

 - Estes exemplos foram aplicados usando Ubuntu 20.04, ainda que estes devam funcionar em outras distribuições Linux
 - A ferramenta de testes de brute force attack é compatível com Windows, Linux e MacOS, desde que tenham NodeJS instalado
