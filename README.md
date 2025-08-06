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


## Deployment Instructions (GKE)

1. **Enable Kubernetes Engine API** in your GCP Project.

2. **Authenticate with GCP CLI (only first time):**
   ```bash
   gcloud auth login
   gcloud config set project banking-k8s-467906
   ```

3. **Create & connect to your GKE cluster:**
   ```bash
   gcloud container clusters create banking-cluster --region=asia-south1
   gcloud container clusters get-credentials banking-cluster --region=asia-south1
   ```

4. **Build and push `bank-api` Docker image to your container registry (GCR or Docker Hub):**

   **🔹 Google Container Registry (GCR):**
   - From the project root (where `Dockerfile` exists):
     ```bash
     docker build -t gcr.io/banking-k8s-467906/bank-api:latest .
     ```
   - Authenticate with GCP (only first time):
     ```bash
     gcloud auth configure-docker
     ```
   - Push image to GCR:
     ```bash
     docker push gcr.io/banking-k8s-467906/bank-api:latest
     ```
   > Replace `banking-k8s-467906` with your actual GCP project ID if different.

   **🔹 Docker Hub:**
   ```bash
   docker build -t <your-dockerhub-username>/bank-api:latest .
   docker push <your-dockerhub-username>/bank-api:latest
   ```

5. **Deploy your Kubernetes resources:**
   ```bash
   cd k8s/
   kubectl apply -f .
   ```

6. **Check services and pods:**

   - View all running resources:
     ```bash
     kubectl get all
     kubectl get ingress
     kubectl get configmaps
     kubectl get secrets
     ```
   - View pods:
     ```bash
     kubectl get pods -l app=bank-api
     kubectl get pods -l app=bank-db
     ```
   - View logs:
     ```bash
     kubectl logs -l app=bank-api
     kubectl logs -l app=bank-db
     ```
   - Restart a pod:
     ```bash
     kubectl delete pod <pod-name>
     ```
   - Verify PersistentVolumeClaim (PVC) is bound:
     ```bash
     kubectl get pvc
     ```
   - PostgreSQL database access:
     ```bash
     kubectl run -i --tty --rm debug --image=postgres:15 -- bash
     psql -h bank-db -U bankuser -d bank
     ```
## Postman Collection:
    [Bank API.postman_collection.json](https://github.com/user-attachments/files/21606719/Bank.API.postman_collection.json)
  

## Github link:
    https://github.com/Bhojrockzzz/NAGPKubernetesDevOpsBhojraj


## 🧑‍💻 Author : 
  **Bhojraj Patil**
  > GitHub: @Bhojrockzzz (https://github.com/Bhojrockzzz/NAGPKubernetesDevOpsBhojraj)
