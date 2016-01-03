module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

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
                    'bower_components/jquery/dist/jquery.min.js',
                    'src/js/vendor/**/*'
                ],
                dest: 'build/js/vendor.js'
            },
            css: {
                src: [
                    'bower_components/reset-css/reset.css',
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

        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            rel: {
                files: {
                    'build/css/main.css': [
                        'bower_components/reset-css/reset.css',
                        'tmp/css/main.css'
                    ]
                }
            }
        },

        jshint: {
            options: {
                'globals': {
                    '$': false,
                    'jQuery': false,
                    '_': false
                },
                'bitwise': true,
                'curly': true,
                'eqeqeq': false,
                'forin': true,
                'freeze': true,
                'funcscope': true,
                'futurehostile': false,
                'iterator': true,
                'latedef': true,
                'noarg': true,
                'nocomma': true,
                'nonew': true,
                'notypeof': true,
                'shadow': false,
                'singleGroups': false,
                'strict': false,
                'undef': true,
                'asi': true,
                'eqnull': false,
                'evil': true,
                'expr': false,
                'lastsemic': true,
                'noyield': false,
                'proto': true,
                'withstmt': true
            },
            dev: {
                options: {
                    'debug': true,
                    'devel': true,
                    'unused': false
                },
                src: ['src/js/**/*.js', '!src/js/vendor/**/*'],
            },
            rel: {
                options: {
                    'debug': false,
                    'devel': false,
                    'unused': true
                },
                src: ['build/js/main.js']
            }
        },

        uglify: {
            dev: {
                options: {
                    beautify: true
                },
                files: {
                    'build/js/main.js': ['src/js/**/*.js', '!src/js/vendor/**/*']
                }
            },
            rel: {
                files: {
                    'build/js/main.js': ['src/js/**/*.js', '!src/js/vendor/**/*']
                }
            }
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
            all: {
                src: ['tmp', 'build']
            }
        },

        watch: {
            options: {
                livereload: true
            },

            js: {
                files: ['src/js/**/*.js'],
                tasks: ['jshint:dev', 'uglify:dev'],
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

    grunt.registerTask('build:dev', [
        'clean',
        'less',
        'concat',
        'jshint:dev',
        'uglify:dev',
        'copy'
    ]);

    grunt.registerTask('build:rel', [
        'clean',
        'less',
        'concat:jsVendor',
        'jshint:rel',
        'uglify:rel',
        'copy'
    ]);

    grunt.registerTask('serve', [
        'connect',
        'watch'
    ]);

    grunt.registerTask('default', [
        'build:dev',
        'serve'
    ]);
};