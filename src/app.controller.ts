import { StackContext } from "@serverless-stack/resources";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecsPatterns from "aws-cdk-lib/aws-ecs-patterns";
import * as s3 from "aws-cdk-lib/aws-s3";

export function MyStack({ stack }: StackContext) {
  // VPC
  const vpc = new ec2.Vpc(stack, "MyVpc");

  // Cluster ECS
  const cluster = new ecs.Cluster(stack, "MyCluster", { vpc });

  // Bucket S3
  const bucket = new s3.Bucket(stack, "MyBucket", {
    autoDeleteObjects: true,
  });

  // Serviço Fargate com ALB
  const fargateService = new ecsPatterns.ApplicationLoadBalancedFargateService(stack, "MyService", {
    cluster,
    taskImageOptions: {
      image: ecs.ContainerImage.fromRegistry("public.ecr.aws/amazonlinux/amazonlinux:latest"), // substitua pela sua imagem Nest.js
      containerPort: 3000,
      environment: {
        BUCKET_NAME: bucket.bucketName,
      },
    },
    publicLoadBalancer: true,
  });

  // Permissões para o container acessar o bucket S3
  bucket.grantReadWrite(fargateService.taskDefinition.taskRole);
}
