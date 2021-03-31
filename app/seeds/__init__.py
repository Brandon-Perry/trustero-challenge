from flask.cli import AppGroup
from app.models import db, List, Task, Comment


seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    
    #Generate Lists
    programming_list = List(name='Programming')
    chores_list = List(name='Chores')
    misc_list = List(name='Misc')
    db.session.add(programming_list)
    db.session.add(chores_list)
    db.session.add(misc_list)
    db.session.commit()

    #Generate Tasks
    task_info = [
        {
            'name': 'hack the mainframe',
            'description': '1) Watch Hackers; 2) Pwn the world',
            'org_list': 'programming',
            'comments': [
                'I need to listen to some Prodigy first',
                'lulz'
            ]
        },
        {
            'name': 'figure out how to invert binary tree',
            'description': "don't ask me how to invert a binary tree",
            'org_list': 'programming',
            'comments': [
                'seriously, I dont know yet'
            ]
        },
        {
            'name': 'finish this coding project',
            'description': 'pretty self explanatory isnt it?',
            'org_list': 'programming',
            'comments': [
                'something something feature creep'
            ]
        },
        {
            'name': 'take out trash',
            'description': 'this is a poor way to phrase taking a self care day',
            'org_list': 'chores',
            'comments': [
                'ooff',
                'kidding'
            ]
        },
        {
            'name': 'build more pylons',
            'description': 'Ive never actually played StarCraft',
            'org_list': 'misc',
            'comments': [
                'I was more a Warcraft kinda guy'
            ]
        },
        {
            'name': 'show Trustero how I can sort a list in O(n) time',
            'description': 'Youre not going to like it',
            'org_list': 'programming',
            'comments': [
                'hackz'
            ]
        }
    ]

    for task in task_info:
        which_list = None
        if task['org_list'] == 'programming':
            which_list = programming_list
        elif task['org_list'] == 'chores':
            which_list = chores_list
        elif task['org_list'] == 'misc':
            which_list = misc_list
        else:
            raise Exception('Theres no valid list for ', task)
        new_task = Task(title=task['name'], description=task['description'], list_id=which_list.id)
        db.session.add(new_task)
        db.session.commit()

        for comment in task['comments']:
            new_comment = Comment(task_id = new_task.id, comment_text = comment)
            db.session.add(new_comment)
            new_task.comments.append(new_comment)


@seed_commands.command('undo')
def undo():
    db.session.execute('TRUNCATE comments, lists, tasks restart identity;')
    db.session.commit()