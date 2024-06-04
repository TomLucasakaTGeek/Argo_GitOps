# Documentation of Codebase


## Project Topic:- Dockerizing a simple web application, deploy it to a Kubernetes cluster using Argo CD, and manage its release process with Argo Rollouts.


### Prerequisites:-

- Experience with Git principles for version control.

- Experience with GitHub to fork and clone the repository.

- Containerization using Docker and a container registry like Docker Hub.

- Familiarity with Kubernetes Concepts like - Pods, Services, Deployments and Clusters.

- Basics of GitOps tools like Argo CD and Argo Rollouts.

  

---

### Our Repo structure is given below:- 
```
 Argo-GitOps
 |_ Source
 |  |_ Dockerfile
 |  |_ .dockerignore
 |  |_ index.js
 |  |_ .gitignore
 |  |_ package.json
 |
 |_ Rollout
 |  |_ svc.yaml
 |  |_ ro.yaml
 |
 |_ .kube
 |  |_ config.yaml
 |
 |_ README.md
```
---

### Step 1:- Creating a Git repository that hosts our code
 - You can use your code editor like VSCode to publish the repository directly.
![Image](https://res.cloudinary.com/practicaldev/image/fetch/s--iYMfyIzt--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/1kfo7md0zzrw44pb1a83.PNG)
 - Alternatively, you can use git commands to publish the source code, right click on the folder and select **"git bash here"**.
	 - Create a new repository on your GitHub and copy the link.
	 - Enter below provided commands on the terminal:-
	 ```
		git init
		git add .
		git commit -m "Your commit message here"
		git remote add origin <repository_clone_link>
		git push -u origin master
	```  
  
### Step 2:- Installing Argo tools on our Kubernetes Cluster
> Note:- The **Docker Desktop** should be up and running from here until you are monitoring the deployment and changes.
- Command to run your Kubernetes cluster 
   ```
	minikube start
   ```
- If faced with any confusion, refer to the original documentation of Kuberentes:- [Learn Kubernetes Basics | Kubernetes](https://kubernetes.io/docs/tutorials/kubernetes-basics/)	

- Commands to install Argo CD to your cluster 
   ```
	kubectl create namespace argocd
	kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml 
   ```
- Commands to install Argo Rollout to your cluster 
   ```
	kubectl create namespace argo-rollouts
	kubectl apply -n argocd -f https://github.com/argoproj/argo-rollouts/releases/latest/download/install.yaml 
   ```

### Step 3:- Dockerizing the Application

- Creating a *Dockerfile* to isolate the source code, and a *.dockerignore* file to hide the unnecessary modules from the container.
[docker commands rest in: Source -> Dockerfile] 
- Run the build command and push command to push the docker image to docker hub.
   ```
	docker build -t {username}/{reponame}:{tag}                      
	docker push {username}/{reponame}:{tag}			         
   ```
- If faced with any confusion, refer to the original documentation of Docker:- [Packaging your software | Docker Docs](https://docs.docker.com/build/building/packaging/) 


### Step 4:- Deploying the application

- Modify **Kubernetes manifests** or *kubeconfig file (./kube/config.yaml)* to use the docker image previously pushed. 

- Login to Argo CD using:-
  ```
	kubectl get all -n argocd                                        #identfy the port for Argo CD 
	kubectl port-forward service/argocd-server -n argocd 8080:443    #runs the Argo Web GUI on 127.0.0.1:8080
  ```
- Login Page looks like this:
 ![image](https://www.unixarena.com/wp-content/uploads/2021/07/Argo-CD-Login-Page.jpg)
- Default username is **"admin"**  and to get the password run the command :
```
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```
- It will open up such an interface
 ![(4-argo-app-created.png (1920×1012) (arthurkoziel.com)](https://www.arthurkoziel.com/setting-up-argocd-with-helm/4-argo-app-created.png)
- Press ```+ NEW APP``` button and specify your project details on the interface to monitor the deployed pod(s).
- Make sure the sync policy is set to Automatic.
- If faced with any confusion, refer to the original documentation of Argo :- [Argo CD | Argo (argoproj.github.io)](https://argoproj.github.io/cd/) or this youtube video:-https://youtu.be/JLrR9RV9AFA?feature=shared
  

### Step 5:- Defining a rollout strategy

- Define a Rollout resource (equivalent to a Deployment) in your project’s Kubernetes manifests under Rollout directory.

- Specify the canary strategy in the rollout definition.

- Set the initial canary weight (e.g., 10%), pause for a specified duration (e.g., 1 hour) to monitor behavior, gradually increase the canary weight (e.g., 20%).

### Step 6:- Implementing the Canary Release strategy with Argo CD

- Commit your updated Kubernetes manifests to your GitHub repository.

- Update your  Docker image with updated source code and push the image to Docker Hub.

- Modify the rollout definition to use the new image.

- Use ArgoCD to sync your application with the updated manifests.


### Step 7:- Monitoring the release and changes

- ArgoCD will manage the rollout process based on the canary strategy.

- Observe the behavior of the canary version.

- Verify that the canary behaves as expected.
 
---

### Cleanup of Kubernetes Cluster:-

- Delete the Argo Rollouts using the following command:
	```
	kubectl delete rollouts {rollout-name}
	```
- Delete the Argo CD application using the argocd CLI:
	```
	argocd app delete {app-name}
	```
- Delete the Kubernetes Deployment using the following command:
	```
	kubectl delete deployment {deployment-name}
	```
- Delete the Docker Image from the Docker Hub using the Docker Hub UI or the Docker CLI. Please refer to the Docker Hub documentation for the specific steps:- [Overview of Docker Hub | Docker Docs](https://docs.docker.com/docker-hub/).

- Delete the Kubernetes Cluster using the following command:
	```
	minikube delete
	```
---

### Challenges and Solutions:- 
- Docker is more than just images. Its a containerization tool where our code is isolated and managed. To understand the docker well, we can refer to this video for simplified but quick explanation:- https://youtu.be/gAkwW2tuIqE?feature=shared
- Kubernetes is not difficult but learning Kubernetes is rather a long process, the documentation is enough:-  [Learn Kubernetes Basics | Kubernetes](https://kubernetes.io/docs/tutorials/kubernetes-basics/)
- I personally felt that Argo CD and Argo Rollouts is rather difficult to understand through documentation and some of the commands are not explicitly mentioned.
- This led me into an infinite confusions of deployments to containers and trying to install the CLI, which is not straightforward for Windows users(like me), and so I referred to this youtube video :- https://youtu.be/JLrR9RV9AFA?feature=shared
- By no chance I am saying their documentation is bad but GitOps intersects so many concepts together, which is not elaborated in the documentation, thus not very beginner-friendly.
---

### THROUGH THIS PROJECT I GOT TO LEARN A LOT OF THINGS HAPPENING ON THE DEPLOYMENT SIDE OF PROJECT.

### MAKE SURE TO STAR THIS REPO IF YOU ENJOYED GITOPS😊.
