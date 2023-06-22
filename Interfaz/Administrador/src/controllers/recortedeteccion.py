#CODIGO PAR CAPTURAR, ALMACENAR Y RECORTAR IMAGENES CON HAARCASCADES (ADD TO REPORT) 


#from picamera import PiCamera
from time import sleep
import numpy as np
import cv2
import os
import errno
import shutil
import re

print("Nombre de carpeta:")
#personName = input()
dataPath = 'C:/Users/yobis/Downloads'
auxPath = 'C:/Users/yobis/Downloads/auxi'
personPath = dataPath 

try:
	os.makedirs(personPath)
	print('Carpeta creada: ',personPath)
except OSError as e:
	if e.errno!=errno.EEXIST:
		raise
'''		
if not os.path.exists(personPath):
    os.makedirs(personPath)
    print('Carpeta creada: ',personPath)
'''

faceClassif  = cv2.CascadeClassifier('C:/Users/yobis/Desktop/Proyectos/pt/python/haarcascades/haarcascade_frontalface_default.xml')
#C:/Users/yobis/Desktop/Proyectos/pt/python/haarcascades
eye_cascade = cv2.CascadeClassifier('C:/Users/yobis/Desktop/Proyectos/pt/python/haarcascades/haarcascade_eye.xml')

'''

camera = PiCamera ()
for i in range (10):
	camera.start_preview()
	camera.capture(auxPath+'/rostro_{}.jpg'.format(i))

camera.stop_preview()
'''

def recortarRostro(path, index, perPath):
	faceClassif  = cv2.CascadeClassifier('C:/Users/yobis/Desktop/Proyectos/pt/python/haarcascades/haarcascade_frontalface_default.xml')
	#Línea 17 inicializamos el contador count que nos ayudará con los nombres para cada rostro.
	image = cv2.imread(path) #Línea 20: Vamos a leer la imagen con cv2.imread.
	imageAux = cv2.imread(path) #Línea 21: creamos una imagen auxiliar copia de la imagen de entrada
	gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)#Línea 22: transformamos la imagen de entrada en escala de grises
	cv2.imshow('gris',gray)
	print('leyendo imagenesgray')
	faces = faceClassif.detectMultiScale(gray, 1.1, 5)

	for (x,y,w,h) in faces:
		cv2.rectangle(image, (x,y),(x+w,y+h),(128,0,255),2)
		cv2.rectangle(image,(10,5),(450,25),(255,255,255),-1)
		cv2.imshow('image',image)
		for (x,y,w,h) in faces:
			rostro = imageAux[y:y+h,x:x+w]
			rostro = cv2.resize(rostro,(150,150), interpolation=cv2.INTER_CUBIC)
			cv2.imwrite(personPath+'/recorte_{}.jpg'.format(index),rostro)
			print('leyendo imagenerecorte')

captureList = os.listdir(auxPath)
print('lista de imagenes',captureList)
c = 0
for namelist in captureList:
	namepath = auxPath + '/'+ namelist
	print('leyendo imagenes', namepath)
	recortarRostro(namepath, c, personPath)
	c=c+1
	
	