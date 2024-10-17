pipeline {
    agent any

    tools{
        nodejs "NodeJS"
    }

    parameters{
        booleanParam(name:'builtCompleted', defaultValue:false, description: '')   
    }

    environment{
        NEW_VERSION = '1.0.0'
        GitHub_Repo_app_name='godwinportfolio-api'
    }

    stages {
        stage('Git Checkout') {
            steps {
                checkout scmGit(branches: [[name: 'main']], 
                        userRemoteConfigs: [[url: 'https://github.com/GodwinOnah/GodwinPortfolio-NodeJs-Mysql-AWS-API.git']])
            }
        }
        stage('Docker Prune') {
            steps {
                sh 'docker system prune -a --volumes -f'              
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t godwin-porfolio-api:${NEW_VERSION} .'
                
            }
        }
        stage('PUSH DOCKER IMAGE TO DOCKERHUB') {
            steps {
                withCredentials([usernamePassword(credentialsId:'godwin-portfolio-Cred', passwordVariable:'PASSWORD', usernameVariable:'USERNAME',)]){
                sh 'docker login -u $USERNAME -p $PASSWORD'
                sh 'docker tag $(docker images --filter=reference=godwin-porfolio-api:${NEW_VERSION} --format "{{.ID}}") $USERNAME/${GitHub_Repo_app_name}'
                sh 'docker push $USERNAME/${GitHub_Repo_app_name}' 
                sh 'docker logout' 
                
                }            
            }
        }
    }
        post {
            always {
               echo "Verion ${ NEW_VERSION} built"   
            }
            success{
                 echo "Built successful."  
            }
            failure{
                echo "Built failed."  
            }
        }
    
}
