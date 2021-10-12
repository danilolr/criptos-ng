rm dist -rf
rm criptos-ng.zip
ng build --prod 
zip -r criptos-ng dist/criptos-ng/
scp criptos-ng.zip root@165.227.54.26:/root/criptos-ng.zip
ssh root@165.227.54.26 '/root/deploy-criptos-ng.sh'
