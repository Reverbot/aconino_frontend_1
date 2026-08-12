import json
try:
    with open('sanity-dump-all-drafts.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    for doc in data:
        doc_id = doc.get('_id', 'unknown')
        print(f"\nChecking Document: {doc_id}")
        pageBuilder = doc.get('pageBuilder', [])
        if not pageBuilder:
            print("  No pageBuilder found.")
            continue
            
        for i, section in enumerate(pageBuilder):
            _type = section.get('_type')
            print(f"  [{i}] Type: {_type}")
            # Check for any field related to video
            video_fields = [k for k in section.keys() if 'video' in k.lower()]
            if video_fields:
                print(f"      FOUND VIDEO FIELDS: {video_fields}")
                for k in video_fields:
                    print(f"      {k}: {section[k]}")
            
            # Check for backgroundType
            if 'backgroundType' in section:
                print(f"      backgroundType: {section['backgroundType']}")
                
except Exception as e:
    print(f"Error: {e}")
