# Lightsail Instance Final Project
This is catalog application working live on lightsail instance.Following are the details to access it.

## How to deploy my site on lightsail instance:
	1. First i set up Amazon AWS account
	2. Create Lightsail instance
	3. Then used the following commands to install desired packages on server where i am going to host my site:
	sudo apt-get update
	sudo apt-get install python-pip
	sudo apt-get install python-flask
	sudo apt-get install apache2
	sudo apt-get install libapache2-mod-wsgi
	4. Used this "sudo apt-get update" to check for the packages updates
	5. Used "sudo apt-get install python-pip" to install pip
	6. Used "sudo apt-get install python-flask" to install flask framework
	7. Used "sudo apt-get install apache2" to insatll apache server
	8. Used "sudo apt-get install libapache2-mod-wsgi" to install WSGI application mod in order to server our flask application 		   requests on the apache server.
	9. After all above setting up i used pip package manager to install all third party libraries was participating in application.
	10. E.g. request, passlib, oauth2client etc. by using pip install request etc.
	11. When all above things done i install git on my server using "sudo apt-get install git" this command in order to clone my       	     project from my git repository.
	12. Then run command sudo git clone /path/to/my/repositroy
	13. Once i cloned it, i navigate into my project directory in my case its name is LinuxProject my execting 	                             cd /var/www/LinuxProject.
	14. Then i made LinuxProject.wsgi file which will serve my flask application. it contains the following content:
	import sys
	sys.path.insert(0, "/var/www/LinuxProject")
	from application import app as application
	15. "from application" phrase is actually the name og my main python file.
	16. Then i created my project's configuration file in apache server named as LinuxProject.conf.
	17. This file contains the following content:
<VirtualHost *>

	ServerName 18.184.157.153
	WSGIScriptAlias / /var/www/LinuxProject/LinuxProject.wsgi
	WSGIDaemonProcess Hello World
	<Directory /var/www/LinuxProject >
		WSGIProcessGroup Hello World
		WSGIApplicationGroup %{GLOBAL}
		Order deny,allow
		Allow from all
	</Directory>
</VirtualHost>
	18. Just after setting up above settings, i disable default apache site configuration by executing following command:
	sudo a2dissite 000-default.conf
	19. Then Restar server by executing sudo service apache2 restart
	20 After restarting i just enable my project's configuration in apacche just by executing:
	sudo a2ensite LinuxProject.conf
	21. Then i give the permissions to my database file by executing chmod 766 /var/www/LinuxProject/catalogapp.db
	22. So now currunt user or the user i have give permission can access to database and perform read write opertions gracefully.


## Packages & Softwares installed on this instance are:
	Apache2
	Mod_wsgi Application
	Flask
	Sqlalchemy
	Requests Module
	Passlib
	oauth2client
## Server Details:
	URL: http://18.184.157.153/
	SSH Port Configured and Allowed in Firewall: 2200
	HTTP Port Configured and Allowed in Firewall: 80
	NTP Port Configured and Allowed in Firewall: 123
## User Details:
	Sudoer User for Testing:
	Username : grader
	Password: grader
	Private Key is attached with it named as private_key.pem.

For furthur query, you can contact at Email: muhammad.zubair@arbisoft.pk
