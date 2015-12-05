
module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-cache-breaker');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({

		copy: {
			assets: {
				files: [
					{
						expand: true,
						cwd: 'src/assets/',
						src: ['**'],
						dest: 'dist/assets/'
					}
				]
			},
			phaser: {
				files: [
					{
						expand: true,
						cwd: 'bower_components/phaser-official/build/',
						src: ['phaser.min.js'],
						dest: 'dist/vendor/'
					}
				]
			},
			index: {
				files: [
					{
						expand: true,
						cwd: 'src/',
						src: ['index.html'],
						dest: 'dist/'
					}
				]
			}
		},

		cachebreaker: {
			index: {
				options: {
					match: [
						'main.min.js',
						'main.min.css',
						'phaser.min.js'
					],
					position: 'append'
				},
				files: {
					src: ['dist/index.html']
				}
			}
		},

		cssmin: {
			dist: {
				files: {
					'dist/css/main.min.css': ['src/css/main.min.css']
				}
			}
		},

		clean: {
			dist: ["dist/"]
		},

		browserify: {
			dist: {
				files: {
					'dist/js/main.min.js': [
						'src/js/**/*.js',
						'src/js/*.js'
					]
				}
			}
		},

		open: {
			dist: {
				path: 'http://localhost:8080'
			}
		},

		connect: {
			dist: {
				options: {
					port: 8080,
					base: 'dist',
					livereload: true
				}
			}
		},

		watch: {
			src: {
				files: ['src/**/*', 'src/*'],
				tasks: ['clean:dist', 'cssmin:dist', 'browserify:dist', 'copy:assets', 'copy:phaser', 'copy:index', 'cachebreaker:index'],
				options: {
					livereload: true
				}
			}
		}

	});

	/**
	 * BUILD
	 */
	grunt.registerTask('default', [
		'build', 'open', 'connect', 'watch'
	]);

	grunt.registerTask('build', [
		'clean:dist', 'cssmin:dist', 'browserify:dist', 'copy:assets', 'copy:phaser', 'copy:index', 'cachebreaker:index'
	]);
};
