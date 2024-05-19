<h1>Documentation of Codebase</h1>

<h2>Project Topic:- Dockerizing a simple web application, deploy it to a Kubernetes cluster using Argo CD, and manage its release process with Argo Rollouts.<h2>  

Step 1:- Creating a Git repository that hosts our code
 - includes an index.js file for web application
 - includes a kubeconfig file for managing cluster

Step 2:- Installing Argo CD on our Kubernetes Cluster
 - Enter "minikube start" command to start the kubernetes cluster 
 - Enter "kubectl create namespace argocd" to add a namespace "argocd"
 - Enter "kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml" to install Argo CD 

Step 3:- Installing Argo Rollouts controller on our Kubernetes Cluster
 - Enter "kubectl create namespace argo-rollouts" to add a namespace "argo-rollouts"
 - Enter "kubectl apply -n argo-rollouts -f https://github.com/argoproj/argo-rollouts/releases/latest/download/install.yaml" to install Argo Rollouts


Step 4:- Dockerizing the Application
 - Creating a .dockerfile to isolate the source code
 - Enter "docker build -t <name>/<reponame>:<tag>" to build a docker image
 - Enter "docker push  <name>/<reponame>:<tag>" to push the docker image to docker hub[public container registry]