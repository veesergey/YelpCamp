provider "aws" {
    profile = "default" 
    region = "${var.aws_region}"
}

resource "aws_instance" "linux2" {
    ami = "${var.ami_id}"
    instance_type = "${var.instance_type}"
    security_groups = ["allow_ssh_http"]
    tags = {
        name = "Linux EC2"
    }
}

resource "aws_security_group" "ssh_http" {
    name = "allow_ssh_http"
    description = "Allows incoming SSH connection to port 22 and http for port 80."
    
  ingress {
      description = "Allows SSH connections (linux)"
      from_port   = 22
      to_port     = 22
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allows Internet traffic connections"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    
  }

}