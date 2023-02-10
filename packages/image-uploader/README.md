### AWS CodeArtifact

Hay que tener la aws cli configurada con una access key y una secret key con acceso al CodeArtifact de Neoco. Para obtener estas credenciales, comunícate con tu TechLead.

Para poder instalar esta librería como dependencia de un proyecto, antes hay que ejecutar el siguiente comando:
 
`aws codeartifact login --tool npm --domain neoadmin-neoco --domain-owner 906935845275 --repository neoadmin-registry`
