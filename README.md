# Documentation of Codebase

## Project Topic:- Dockerizing a simple web application, deploy it to a Kubernetes cluster using Argo CD, and manage its release process with Argo Rollouts.  

Prerequisites:- 
 - Experience with Git commands and GitHub platform.
 - Containerization using Docker and a container registry like Docker Hub.
 - Familiarity with Kuberentes Concepts like - Pods, Services, Deployments and Clusters.
 - Basics of GitOps tools like Argo CD and Argo Rollouts

--
Step 1:- Creating a Git repository that hosts our code
 - includes a Source directory for web application.
 - includes a kubeconfig file (./kube/config.yaml) for managing cluster.

Step 2:- Installing Argo CD on our Kubernetes Cluster
 - Enter "minikube start" command to start the kubernetes cluster. 
 - Enter "kubectl create namespace argocd" to add a namespace "argocd".
 - Enter "kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml" to install Argo CD. 

Step 3:- Installing Argo Rollouts controller on our Kubernetes Cluster
 - Enter "kubectl create namespace argo-rollouts" to add a namespace "argo-rollouts".
 - Enter "kubectl apply -n argo-rollouts -f https://github.com/argoproj/argo-rollouts/releases/latest/download/install.yaml" to install Argo Rollouts.

Step 4:- Dockerizing the Application
 - Creating a Dockerfile to isolate the source code.
 - Enter "docker build -t {username}/{reponame}:{tag}" to build a docker image.
 - Enter "docker push {username}/{reponame}:{tag}" to push the docker image to docker hub[public container registry].

Step 5:- Deploying the application
 - Modifying kubeconfig file (./kube/config.yaml) to use the docker image previously pushed. 
 - Enter "kubectl get all -n argocd" to identify the port of Argo CD.
 - Enter "kubectl port-forward service/argocd-server -n argocd 8080:443" to login to the ArgoCD web GUI.
 - Press create app button and specify your app hosted on the github. 

Step 6:- Defining a rollout strategy
 - Define a Rollout resource (equivalent to a Deployment) in your project’s Kubernetes manifests under Rollout directory.
 - Specify the canary strategy in the rollout definition.
 - Set the initial canary weight (e.g., 10%), pause for a specified duration (e.g., 1 hour) to monitor behavior, gradually increase the canary weight (e.g., 20%).
 
Step 7:- Implementing the Canary Release strategy with Argo CD
 - Commit your updated Kubernetes manifests to your GitHub repository.
 - Build your project code into a Docker image and push the image to Docker Hub.
 - Modify the rollout definition to use the new image.
 - Use ArgoCD to sync your application with the updated manifests.

Step 8:- Monitoring the release and changes 
 - ArgoCD will manage the rollout process based on the canary strategy.
 - Observe the behavior of the canary version.
 - Verify that the canary behaves as expected.
