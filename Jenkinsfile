pipeline {
    agent any

    tools {
        nodejs 'nodejs'  // Name from Jenkins Global Tool Config for Node.js
    }

    environment {
        SONARQUBE_ENV = 'SonarQube-server'
        SONARQUBE_TOKEN = credentials('sonar')         // Jenkins credential ID for SonarQube token
        GITHUB_TOKEN = credentials('github-token')     // Jenkins credential ID for GitHub PAT
        VERCEL_TOKEN = credentials('vercel-token') 
        NVD_API_KEY = credentials('nvd_api_key')    
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/yashBorkar404/qrcode.git', branch: 'main'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install --legacy-peer-deps'
            }
        }

        stage('Run tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
                // sh 'npm run export'  // If you use `next export` to generate static site
            }
        }

        stage('SonarQube Analysis') {
             steps {
                 withSonarQubeEnv(SONARQUBE_ENV) {
                    sh """
                        npx sonar-scanner \
                        -Dsonar.projectKey=qrcode \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=http://172.18.0.1:9000 \
                        -Dsonar.token=${SONARQUBE_TOKEN}
                    """
        }
    }
}


        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Deploy to Vercel') {
            steps {
                script {
                    // Install Vercel CLI if not already installed
                    sh 'npm install -g vercel'

                    // Use Jenkins credentials to authenticate with Vercel
                     withCredentials([string(credentialsId: 'VERCEL_TOKEN', variable: 'VERCEL_TOKEN')]) {
                        // Deploy to production environment without prompts
                        sh 'vercel --prod --confirm --token $VERCEL_TOKEN'
                    }
                }
             }
        }

    }
}
