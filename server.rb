require "sinatra"
require 'json'
require 'pry'

set :bind, '0.0.0.0'  # bind to all interfaces
set :public_folder, File.join(File.dirname(__FILE__), "public")

def tasks
  file = File.read("tasks.json")
  JSON.parse(file)
end

def new_task_id
  tasks["tasks"].last["id"] + 1
end

def write_to_json_file(task)
  new_task = {id: new_task_id, description: task["description"] }
  new_tasks = { tasks: tasks["tasks"].concat([new_task]) }
  json_tasks = JSON.pretty_generate(new_tasks, indent: '  ')
  File.write("tasks.json", json_tasks)
end

get "/tasks" do
  File.read(File.join('public', 'index.html'))
end

get "/api/v1/tasks" do
  content_type :json
  status 200
  tasks.to_json
end

post "/api/v1/tasks" do
  json = JSON.parse(request.body.read)
  if json["task"]
    write_to_json_file(json["task"])
    status 200
  else
    status 500
    { error: "Oops, something bad happened!!" }.to_json
  end
end
