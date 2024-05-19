Dentro de IAM identity center hay un grupo, ese grupo tiene acceso a la cuenta principal usando un permission set, ese set permite listar las tablas de la cuenta principal y hacer de todo solo ciertas tablas definidas en el permission set. Esto cumple doble funcion de poder acceder a las tablas desde codigo y a la vez poder controlar las tablas desde la consola AWS.

Para poder controlar las tablas por codigo

A. Instalar AWS CLI [link](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

B. abrir una consola y correr `aws configure sso`

1. dar nombre a la sesion
2. ocupar el start url dado
3. ingresar la region 'sa-east-1'
4. dejar registraion scopes como esta [sso:account:access]
5. presionar 'confirm and continue' en la pagina que se abre
   5.1 haz login con tu cuenta si es necesario
6. dar accesso a botocore en siguiente pagina
7. cerrar pestana
8. selecciona 'c18-Dev-AssumeRole' en consola
9. ingresar sa-east-1 como default client region
   10.dejar default output format como esta [None]
   11.dejar profile name como esta

C. correr `npm i` para instalar las dependencias
D. correr `npm start` para empezar el server
E. hacer una consulta a `/doctor` para crear un nuevo doctor
