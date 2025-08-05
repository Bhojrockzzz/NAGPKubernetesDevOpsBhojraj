# NAGP Kubernetes DevOps Project – Bhojraj Patil

This project is part of the NAGP Kubernetes & DevOps module. It demonstrates a multi-tier architecture deployed on **Google Kubernetes Engine (GKE)**, including:

# Features

- Kubernetes-based microservice deployment
- GKE ingress setup for external exposure
- PostgreSQL with PersistentVolume support
- Secure configuration using Kubernetes Secrets & ConfigMaps

# Architecture Overview
- **Backend**: Node.js microservice (Banking API)
- **Database**: PostgreSQL with persistent volume support
- **Platform**: Google Kubernetes Engine (GKE)
- **DevOps Features**:
  - Dockerized microservices
  - Kubernetes Deployments, Services, Ingress
  - ConfigMaps and Secrets
  - Persistent storage using PVC
  - Scalability using replica sets
  - Ingress routing & external exposure

# Access API
Once deployed:
> **Public Ingress IP**: [http://34.118.237.251](http://34.118.237.251)  -- (This IP may change if Ingress is recreated)

# API Endpoints 
- **/healthz**:  
  For Health check
- **/accountBalance**:  
  To Get account balance by ID  
- **/addMoney**:  
  To Add money to a user account
- **/transferMoney**:  
  To Transfer money between accounts

# Docker Images

- **Node.js API**:  
  [gcr.io/banking-k8s-467906/bank-api:latest](https://console.cloud.google.com/gcr/images/banking-k8s-467906/GLOBAL/bank-api)

- **PostgreSQL**:  
  Official image used: `postgres:15`


# Deployment Instructions (GKE)

1. **Enable Kubernetes Engine API** in your GCP Project.
2. **Authenticate with GCP CLI- Only first time**:
    ```bash
    gcloud auth login
    gcloud config set project banking-k8s-467906
3. **Create & connect to your GKE cluster:**:
    gcloud container clusters create banking-cluster --region=asia-south1
    gcloud container clusters get-credentials banking-cluster --region=asia-south1
4. **Buil and Push 'bank-api' docker image to your container registry Docker Hub or GCR:**:
  **GCR :**
  **From project root (where Dockerfile exists)**
    docker build -t gcr.io/banking-k8s-467906/bank-api:latest .
    Replace <banking-k8s-467906> with <your-project-id>
  **Authenticate with GCP (only first time)**
    gcloud auth configure-docker
  **Push image to Google Container Registry**
    docker push gcr.io/banking-k8s-467906/bank-api:latest
    Replace <banking-k8s-467906> with actual GCP project ID
  **Docker Hub :**
    docker build -t <your-dockerhub-username>/bank-api:latest .
    docker push <your-dockerhub-username>/bank-api:latest
5. **Deploy your Kubernetes resources:**:
    cd k8s/
    kubectl apply -f .
6. **Check services and pods:**:
  # View all running resources
    kubectl get all
  # View logs for bank-api or bank-db
    kubectl logs -l app=bank-api
    kubectl logs -l app=bank-db
  # Restart a pod
    kubectl delete pod <pod-name>
  # Verify PVC is bound
    kubectl get pvc
  # Port-forward to test service locally
    kubectl port-forward svc/bank-api-service 3000:3000


🧑‍💻 Author
Bhojraj Patil
GitHub: @Bhojrockzzz (https://github.com/Bhojrockzzz)
