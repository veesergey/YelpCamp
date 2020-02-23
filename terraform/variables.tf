variable "aws_region" {
    default = "us-east-1"
    description = "AWS Region the instance will be created in."
}

variable "ami_id" {
    default = "ami-0a887e401f7654935"
    description = "Amazon Linux 2 AMI, comes with free tier support so developers new to AWS can get their feet wet!"
}

variable "instance_type" {
    default = "t2.micro"
}