import os
import subprocess
import django
from django.core.management import call_command
from django.contrib.auth import get_user_model

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'status_page.settings')
django.setup()

# Esegui migrazione del database
call_command('migrate')

# Raccogli i file statici
call_command('collectstatic', '--noinput')

# Crea superuser
User = get_user_model()
username = os.environ.get('DJANGO_SUPERUSER_USERNAME')
email = os.environ.get('DJANGO_SUPERUSER_EMAIL')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')

folder_path = os.getenv("RAILWAY_VOLUME_MOUNT_PATH") + '/images/'
if(not os.path.exists(folder_path)):
    os.makedirs(folder_path, exist_ok=True)
print("Folder created successfully" if os.path.exists(folder_path) else "Failed to create folder")

if username and email and password:
    if not User.objects.filter(username=username).exists():
        User.objects.create_superuser(username, email, password)
        print('Superuser created.',flush=True)
    else:
        print('Superuser creation skipped: already exists.',flush=True)
else:
    print("Superuser environment variables not set. Skipping superuser creation.",flush=True)

# Crea superuser
User = get_user_model()
username = os.environ.get('DJANGO_SUPERUSER_USERNAME_VICE')
email = os.environ.get('DJANGO_SUPERUSER_EMAIL_VICE')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD_VICE')

if username and email and password:
    if not User.objects.filter(username=username).exists():
        User.objects.create_superuser(username, email, password)
        print('Superuser created.',flush=True)
    else:
        print('Superuser creation skipped: already exists.',flush=True)
else:
    print("Superuser environment variables not set. Skipping superuser creation.",flush=True)


subprocess.run(['gunicorn', 'status_page.wsgi:application', "--log-file -"])

