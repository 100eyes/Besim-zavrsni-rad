#Zavrsni rad - Upravljanje robota pomocu bluetooth komunikacije


Pri skidanju po prvi put:

    npm install

Za pokretanje:

    npm start

Za kreiranje gotove verzije (kreiranje .exe file-a):

    npm run-script build

 *kreira folder bin u kojem se nalazi executable file



Postavljanje virtualnog porta na linux-u:

    hcitool scan 

    sudo rfcomm bind /dev/rfcomm0 <Mac-address of hcitool scan> 1
