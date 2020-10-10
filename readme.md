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

É possível fazer o acesso usando chaves assimétricas. Neste caso o primeiro passo é gerar um par seguro de chaves:

```bash
sudo apt install -y openssh-client # caso não tenha instalado
ssh-keygen -o -a 100 -t ed25519 -f ~/.ssh/id_ed25519 -C "fulano@example.com"
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

 - Estes exemplos foram aplicados usando Ubuntu 20.04, ainda que este deve funcionar em outras distribuições Linux, exceto a instação de pacotes
 - A ferramenta de testes de brute force attack é compatível com Windows, Linux e MacOS, desde que tenham NodeJS instalado
