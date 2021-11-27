#!/usr/bin/env ruby

# Script to generate random images. Based on http://www.imagemagick.org/Usage/canvas/#random_blur

require 'optparse'

options = {}

optparse = OptionParser.new do |opts|

  opts.on( '-s', '--size HxV', 'create image of size HxV (400x400 default)' ) do |size|
    options[:size] = size
  end
  options[:size] ||= "400x400"

  opts.on( '-t', '--type TYPE', 'random generator type (noise|plasma)' ) do |size|
    case size
    when 'plasma'
      options[:type] = "plasma:"
    end
  end
  options[:type] ||= "xc: +noise Random"

  opts.on( '-n', '--number NUMBER', 'number of files to create (ignores filenames)' ) do |number|
    options[:number] = number.to_i
  end

  opts.on( '-h', '--help', 'Display this screen' ) do
    puts opts
    exit
  end
end

optparse.parse!

if options[:number]
  for i in 1..options[:number]
    `convert -size #{options[:size]} #{options[:type]} '#{i}.png'`
  end
else
  files = (!ARGV.empty? && ARGV) || ["random.png"]
  files.each do |f|
    `convert -size #{options[:size]} #{options[:type]} #{f}`
  end
end