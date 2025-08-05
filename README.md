# NAGP Kubernetes DevOps Project – Bhojraj

This project is part of the NAGP Kubernetes & DevOps module. It demonstrates a multi-tier architecture deployed on **Google Kubernetes Engine (GKE)**, including:

- Node.js microservice (banking API)
- PostgreSQL database
- Kubernetes services, deployments, ingress, secrets, config maps, and persistent volumes


# Features

- Kubernetes-based microservice deployment
- GKE ingress setup for external exposure
- PostgreSQL with PersistentVolume support
- Secure configuration using Kubernetes Secrets & ConfigMaps


# Deploy on GKE
1. Enable GKE API in your GCP project.
2. Authenticate:
   ```bash
   gcloud auth login
   gcloud config set project <your-gcp-project-id>
3. Create cluster:
  gcloud container clusters create banking-cluster --region=asia-south1
  gcloud container clusters get-credentials banking-cluster --region=asia-south1
4. Apply resources:
  cd k8s/
  kubectl apply -f .


# Access API
Once deployed:
Ingress IP: http://<EXTERNAL_IP>
Endpoints:
/healthz
/accountBalance
/addMoney
/transferMoney



🧑‍💻 Author
Bhojraj Patil
GitHub: @Bhojrockzzz (https://github.com/Bhojrockzzz)
