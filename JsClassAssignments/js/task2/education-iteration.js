console.log('Task2: education iteration');

var myself = {
    'name': 'Bijen Maharjan',
    'address': 'Dhalko',
    'emails': 'bij.maharjan@gmail.com',
    'interests': 'chill',
    'education': [
        {'name': 'SVI', 'enrolledDate': 2005},
        {'name': 'Nist', 'enrolledDate': 2012}
    ]
};

for (var kkey in myself) {
    if (kkey === 'education') {
        for (var kkey1 in myself.education) {
            console.log('Name:' + myself.education[kkey1].name + ', Date:' + myself.education[kkey1].enrolledDate);
        }
    }
}