# DIMES

A React web application which provides the front-end user interface for the online discovery of archival collections, objects, and agents at the Rockefeller Archive Center.

DIMES is part of [Project Electron](https://github.com/RockefellerArchiveCenter/project_electron), an initiative to build sustainable, open and user-centered infrastructure for the archival management of digital records at the [Rockefeller Archive Center](http://rockarch.org/).

## Local Development

Install [git](https://git-scm.com/) and clone the repository

    $ git clone https://github.com/RockefellerArchiveCenter/dimes.git

Install dependencies and run the development server:

    $ yarn install
    $ yarn start

### Visual regression testing

The repository includes [BackstopJS](https://github.com/garris/BackstopJS) to test visual changes to the site by comparing a set of reference images for different screen sizes. Anytime the CSS styles are changed, use BackstopJS to test locally:

1. Run the BackstopJS tests: `yarn backstop test`.
2. Review the results in the browser and look at the diff of any failed tests.
3. To update the reference image files with the results of the last test images use: `yarn approve`. Subsequent tests will be compared against these updated reference files.
4. Commit any updated reference images to the repository so that future tests will be compared against the most recent images.

To add or update reference images, edit the scenarios in `backstop.json` and run `yarn reference`.

## Dev deployment

Updated images are built each time a commit is pushed to base. To deploy in vSphere, first update the image by pulling the most recent version:

    $ docker -H {vsphere host}:{vsphere port} --tlsverify pull rockarch/dimes:development

Get the ID of the running container

    $ docker -H {vsphere host}:{vsphere port} --tlsverify container ls

Then stop the running container:

    $ docker -H {vsphere host}:{vsphere port} --tlsverify stop {container ID}

Finally, start the updated container:

    $ docker -H {vsphere host}:{vsphere port} --tlsverify run -d -p 3001:80 rockarch/dimes:development

DIMES will then be available at the vSphere host, port 3001.


## License

This code is released under an [MIT License](LICENSE).
