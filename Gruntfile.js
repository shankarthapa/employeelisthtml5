module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		wiredep: {
	      target: {
	        src: 'app/lib.html' // point to your HTML file.
	      }
	    },

	    jshint:{
	    	all: [ 'app/js/**/*.js']
	    },

	    concat: {
	    	js: {
	    		src: ['app/js/main.js','app/js/**/*.js'],
	    		dest: 'build/js/main.js'
	    	},

	    	css: {
	    		src: [require('wiredep')().css],
	    		dest: 'build/css/lib.css'
	    	}
	    },

		uglify:{

			jsMin:{
				options:{
					banner: '/*! <%= pkg.name %> Created on:- <%= grunt.template.today("yyyy-mm-dd") %> */\n'
				},
				files: {
			         'build/js/main.min.js' : ['build/js/main.js']
			      }
			  },

			jsMinLib:{
				files: { 'build/js/lib.min.js': require('wiredep')().js }
			}
			
		},

		htmlmin: {
			dist:{
				options: {                                 // Target options
			        removeComments: true,
			        collapseWhitespace: true
			      },
			      files: [ {
			      				expand : true,
			      				cwd: 'app/',
			      				src : ['index.html'],
			      				dest: 'build/'
			      		},
			      		{
			      				expand : true,
			      				cwd: 'app/view/',
			      				src : ['**/*.html'],
			      				dest: 'build/view/'
			      		}  
			      		]
			}
			
		}

		

	});
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');

  	// Default task(s).
  	grunt.registerTask('build', ['wiredep', 'jshint', 'concat' ,'uglify', 'htmlmin']);
};