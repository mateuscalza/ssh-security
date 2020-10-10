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

É possível fazer o acesso usando chaves assimétricas. Neste caso o primeiro 

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
