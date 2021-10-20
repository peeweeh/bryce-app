FROM python
RUN apt-get update -qqy && \
    apt-get -qqy install wget g++ && \
    rm -rf /var/lib/apt/lists/*
# show python logs as they occur
ENV PYTHONUNBUFFERED=0

# get packages
WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip install -r /app/requirements.txt

COPY . /app/
# set listen port
ENV PORT "5000"
EXPOSE 5000
#hello
ENTRYPOINT ["python", "/app/app.py"]
