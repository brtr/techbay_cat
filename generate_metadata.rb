#!/usr/bin/env ruby

require 'json'
require 'ffaker'
require 'optparse'

options = {}

optparse = OptionParser.new do |opts|

  opts.on( '-n', '--number NUMBER', 'number of files to create (ignores filenames)' ) do |number|
    options[:number] = number.to_i
  end

  opts.on( '-h', '--help', 'Display this screen' ) do
    puts opts
    exit
  end
end

optparse.parse!

def generate_metadata(num)
  data = {
    name: "TechBayTest ##{num}",
    description: "TechBay NFT - TechBayTest",
    image: "ipfs://QmT7CGSeSYhdepiU6WjRRCCq7K1uJ4dHXTpoKgTMZnjkab/#{num}.png",
    attributes: [
     {
      trait_type: "bg_color",
      value: FFaker::Color.name
     },
     {
      trait_type: "text_color",
      value: FFaker::Color.name
     }
    ]
  }.to_json
  File.write(num.to_s, JSON.pretty_generate(JSON.parse(data)))
end

if options[:number]
  for i in 1..options[:number]
    generate_metadata(i)
  end
else
  generate_metadata(1)
end