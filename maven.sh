#!/bin/bash

# Get the current directory
BASE_DIR="$(pwd)"

# Path to the Maven executable
MAVEN_PATH="C:\Program Files\JetBrains\IntelliJ IDEA 2023.2.2\plugins\maven\lib\maven3"

# List of directories containing Maven projects
PROJECT_DIRS=("eurekaDiscov" "foyer-ms" "gateway" "universite-ms")

# Iterate over each directory and run Maven install
for DIR in "${PROJECT_DIRS[@]}"; do
  # Move to the project directory
  cd "$BASE_DIR/$DIR" || exit

  # Run Maven install using the provided Maven executable path
  "$MAVEN_PATH" clean install

  # Check if Maven install was successful
  if [ $? -eq 0 ]; then
    echo "Maven install successful in $DIR"
  else
    echo "Maven install failed in $DIR"
  fi

  # Move back to the original directory
  cd "$BASE_DIR" || exit
done
