#!/bin/bash

cd frontend
npm run build

cd ..
python manage.py collectstatic --noinput
