module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 8000,
                    protocol: 'http',
                    hostname: 'localhost',
                    base: 'build/'
                }
            }
        },

        concat: {
            options: {
                separator: '\n'
            },
            jsVendor: {
                src: [
                    // 'bower_components/somelib/lib.js',
                    'src/js/vendor/**/*'
                ],
                dest: 'build/js/vendor.js'
            },
            js: {
                src: ['src/js/**/*.js', '!src/js/vendor/**/*'],
                dest: 'build/js/main.js'
            },
            css: {
                src: [
                    // 'bower_components/somelib/lib.css',
                    'tmp/css/main.css'
                ],
                dest: 'build/css/main.css'
            }
        },

        less: {
            dev: {
                files: {
                    'tmp/css/main.css': 'src/less/main.less'
                }
            },
        },

        copy: {
            html: {
                expand: true,
                cwd: 'src/',
                src: ['*.html'],
                dest: 'build/'
            },
            img: {
                expand: true,
                cwd: 'src/img/',
                src: ['**/*'],
                dest: 'build/img/'
            },
            images: {
                expand: true,
                cwd: 'src/images/',
                src: ['**/*'],
                dest: 'build/images/'
            }
        },

        clean: {
            build: {
                src: ['tmp']
            }
        },

        watch: {
            options: {
                livereload: true
            },

            js: {
                files: ['src/js/**/*.js'],
                tasks: ['concat:js'],
                options: {
                    interrupt: true
                }
            },

            jsVendor: {
                files: ['src/js/vendor/**/*.js'],
                tasks: ['copy:jsVendor'],
                options: {
                    interrupt: true
                }
            },

            less: {
                files: ['src/**/*.less'],
                tasks: ['less', 'concat:css'],
                options: {
                    interrupt: true
                }
            },

            html: {
                files: ['src/**/*.html'],
                tasks: ['copy:html'],
                options: {
                    interrupt: true
                }
            },

            img: {
                files: ['src/img/**/*'],
                tasks: ['copy:img'],
                options: {
                    interrupt: true
                }
            },

            images: {
                files: ['src/images/**/*'],
                tasks: ['copy:images'],
                options: {
                    interrupt: true
                }
            }
        }
    });

    grunt.registerTask('build', [
        'less',
        'concat',
        'copy',
        'clean'
    ]);
    grunt.registerTask('dev', [
        'connect',
        'watch'
    ]);
    grunt.registerTask('default', [
        'build',
        'dev'
    ]);
};