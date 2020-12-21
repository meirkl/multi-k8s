aws eks create-cluster \
--name multi-k8s-eks \
--role-arn $role_arn \
--resources-vpc-config subnetIds=subnet-0e79cb7d32e4be5d9,subnet-0ce1d17e88636bff7,subnet-0f57b343b753996d6,securityGroupIds=sg-0ab7db8be4790f2b9,endpointPublicAccess=true,endpointPrivateAccess=false

aws iam attach-role-policy --role-name multi-k8s-eks-role-nodes --policy-arn  arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy
aws iam attach-role-policy --role-name multi-k8s-eks-role-nodes --policy-arn  arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy
aws iam attach-role-policy --role-name multi-k8s-eks-role-nodes --policy-arn  arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly

aws eks create-nodegroup \
--cluster-name multi-k8s-eks \
--nodegroup-name test \
--node-role $role_arn \
--subnets subnet-0e79cb7d32e4be5d9 \
--disk-size 200 \
--scaling-config minSize=1,maxSize=3,desiredSize=1 \
--instance-types t2.micro