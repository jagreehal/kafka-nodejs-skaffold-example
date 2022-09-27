#!/bin/bash

helm repo add bitnami https://charts.bitnami.com/bitnami
helm upgrade kafka bitnami/kafka -f ./infra/values/kafka.yaml >> minikube-setup.log