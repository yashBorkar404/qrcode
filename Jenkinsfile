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
                        -Dsonar.login=$SONARQUBE_TOKEN
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

        stage('OWASP Dependency Check') {
            steps {
                dependencyCheck additionalArguments: """
                    --scan . 
                    --format HTML 
                    --out reports/dependency-check-report
                    --nvdApiKey $NVD_API_KEY
                    --nvdDelay 8000
                """, odcInstallation: 'owasp'
            }
        }

        stage('Publish OWASP Dependency Check Report') {
            steps {
                script {
                    def reportFile = 'reports/dependency-check-report/dependency-check-report.html'
                    sh 'ls -l reports/dependency-check-report || true'
                    if (fileExists(reportFile)) {
                        publishHTML([
                            reportDir: 'reports/dependency-check-report',
                            reportFiles: 'dependency-check-report.html',
                            reportName: 'OWASP Dependency Check Report'
                        ])
                    } else {
                        echo "Dependency-Check HTML report not found. Skipping publishHTML."
                    }
                }
            }
        }

        stage('Link and Deploy to Vercel') {
            steps {
                sh 'rm -rf .vercel'
                sh 'npx vercel link --yes --token $VERCEL_TOKEN'
                sh 'npx vercel --prod --yes --token $VERCEL_TOKEN'
            }
        }
    }

    post {
        always {
            script {
                def reportDir = 'reports/dependency-check-report'
                if (fileExists("${reportDir}/dependency-check-report.html")) {
                    publishHTML([
                        reportDir: "${reportDir}",
                        reportFiles: 'dependency-check-report.html',
                        reportName: 'OWASP Dependency Check Report'
                    ])
                } else {
                    echo "Report not generated. Skipping publishHTML."
                }
            }
        }
        failure {
            mail to: 'you@example.com',
                 subject: "Build failed in Jenkins: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "Please check the Jenkins build logs."
        }
    }
}
