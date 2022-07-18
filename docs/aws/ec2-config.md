
- #### EC2 인스턴스에 깃 설치하기
    - installation
      - `sudo yum update -y`
      - `sudo yum install git -y`
      - `git version`
      
- #### EC2 인스턴스에 도커 설치하기
    - sudo yum install docker -y
    - sudo service docker start
    - systemctl status docker.service 서비스 실행 확인
    - 그룹 설정
        - sudo usermod -a -G docker ec2-user // ec2-user 권한 생성
        - sudo usermod -a -G docker jenkins // jenkins 권한 설정
    - docker ps: 권한 문제
      > ot permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get "http://%2Fvar%2Frun%2Fdocker.sock/v1.24/containers/json": dial unix /var/run/docker.sock: connect: permission denied

      [stackoverflow](https://stackoverflow.com/questions/48957195/how-to-fix-docker-got-permission-denied-issue)
        1. sudo groupadd docker
        2. sudo usermod -aG docker $USER
        3. newgrp docker
        4. docker run hello-world
        5. reboot

    - docker command
        - systemctl stop docker.service
            - `Warning: Stopping docker.service, but it can still be activated by:
              docker.socket`
            - sudo systemctl stop docker.socket
            - sudo systemctl status docker.socket
            - sudo systemctl stop docker


### References
