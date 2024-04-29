# function generate_random_string() {
#   LC_ALL=C tr -dc 'a-zA-Z0-9' < /dev/urandom | fold -w 32 | head -n 1
# }

# for folder in test[0-9]*/; do
#   # Check if the folder exists and is a directory
#   if [ -d "$folder" ]; then
#     # Check if the schema.ts file exists in the folder
#     if [ -f "$folder/schema.ts" ]; then
#       # Generate a unique random string for each file
#       random_string=$(generate_random_string)

#       # Replace "abc123" with the random string in the schema.ts file
#       sed -i "" "s/str_to_replace/$random_string/g" "$folder/schema.ts"

#       echo "Modified $folder/schema.ts with random string: $random_string"
#     else
#       echo "schema.ts not found in $folder"
#     fi
#   fi
# done

# if [ $? -ne 0 ]; then
#   echo "No folders starting with 'test' followed by a number were found in the current directory."
# fi


# Initialize an empty array to store the folder names and IDs
declare -a folder_ids

# Traverse folders starting with "test" followed by a number
for folder in test[0-9]*/; do
  # Check if the folder exists and is a directory
  if [ -d "$folder" ]; then
    # Check if the schema.ts file exists in the folder
    if [ -f "$folder/schema.ts" ]; then
      # Extract the ID value from the schema.ts file using grep and sed
      id=$(sed -n 's/.*id: "\(.*\)".*/\1/p' "$folder/schema.ts")

      # Store the folder name and ID in the array
      folder_ids+=("\"$id\": \"$folder\"")
    else
      echo "schema.ts not found in $folder"
    fi
  fi
done

# Check if the array is empty
if [ ${#folder_ids[@]} -eq 0 ]; then
  echo "No folders starting with 'test' followed by a number were found or no IDs were extracted."
else
  # Create the map.js file and write the folder names and IDs
  echo "{" > map.js

  # Join the array elements with commas and write them to map.js
  printf '%s,\n' "${folder_ids[@]}" >> map.js

  # Remove the trailing comma from the last line
  sed -i '' '$ s/,$//' map.js

  echo "}" >> map.js

  echo "map.js file created successfully."
fi
