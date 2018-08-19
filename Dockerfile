# Django <2.0 has incompatibilities with Python 3.7
FROM python:3.6
ENV PYTHONUNBUFFERED 1
RUN mkdir /djnci
WORKDIR /djnci
ADD requirements.txt /djnci/
RUN pip install -r requirements.txt
ADD . /djnci/
