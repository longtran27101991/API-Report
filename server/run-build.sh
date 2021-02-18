version=$1
rm -rf build && cp -r ../frontend/build .
docker build -t fpt-fti/ikhien:$version -f Dockerfile .
docker tag fpt-fti/ikhien:$version gcr.io/fpt-fti/ikhien:$version
docker push gcr.io/fpt-fti/ikhien:$version

