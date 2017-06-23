from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
import simplejson as json;

from .models import Topic

# Create your views here.
def index(request):
    newspaper_list = Topic.objects.all()
    topics_len = len(topic_list)
    context = {
        'topics_len': news_len,
        'topics_list': newspaper_list
    }
    return render(request,'topics/index.html', context)

def detail(request, topic_id):
    topic = get_object_or_404(Topic, pk=topic_id)
    return render(request, 'topics/detail.html', {'topic':topic})

def topicsAsJSON(request):
    keys = json.loads(request.GET.get("json_data"))
    data = keys
    topics = Topic.objects.filter(key__in = keys["topics"])
    topics_json = "{"
    for t in topics:
        topics_json += str(t.key) + ":" + t.toJSON() + ","
    topics_json = topics_json[:-1]
    topics_json += "}"
    return HttpResponse(topics_json, content_type='application/json')
